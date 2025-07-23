'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Copy, 
  Download, 
  Trash2, 
  Play, 
  Square, 
  Volume2,
  Languages,
  FileText,
  ArrowRight
} from 'lucide-react';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const languages = [
  { code: 'en-US', name: 'English', nativeName: 'English' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
  { code: 'nl-NL', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bho-IN', name: 'Bhojpuri', nativeName: 'भोजपुरी' }, // May not be supported by all browsers
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export default function SpeechToTextClient() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('en-US');
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Recording Started",
          description: "Speak clearly into your microphone",
        });
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
        toast({
          title: "Recording Stopped",
          description: "Speech recognition has ended",
        });
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) {
          setTranscript(prev => prev + finalText + ' ');
          setInterimTranscript('');
        } else {
          setInterimTranscript(interimText);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setInterimTranscript('');
        
        let errorMessage = 'Speech recognition error occurred';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech was detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone was found or audio capture failed.';
            break;
          case 'not-allowed':
            errorMessage = 'Permission to use microphone was denied.';
            break;
          case 'network':
            errorMessage = 'Network error occurred.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [selectedLanguage, toast]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const clearText = () => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(null);
    toast({
      title: "Text Cleared",
      description: "All text has been cleared",
    });
  };

  const copyToClipboard = async () => {
    if (transcript.trim()) {
      try {
        await navigator.clipboard.writeText(transcript.trim());
        toast({
          title: "Copied to Clipboard",
          description: "Text has been copied to your clipboard",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy text to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  const downloadText = () => {
    if (transcript.trim()) {
      const element = document.createElement('a');
      const file = new Blob([transcript.trim()], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `speech-to-text-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Download Started",
        description: "Your text file is being downloaded",
      });
    }
  };

  const speakText = () => {
    if (!transcript.trim()) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(transcript.trim());
    utterance.lang = selectedLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      toast({
        title: "Speech Error",
        description: "Failed to play speech",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const translateText = async () => {
    if (!transcript.trim() || selectedLanguage === targetLanguage) {
      setTranslatedText(transcript);
      return;
    }
    setIsTranslating(true);
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${selectedLanguage.split('-')[0]}&tl=${targetLanguage.split('-')[0]}&dt=t&q=${encodeURIComponent(transcript)}`
      );
      const data = await res.json();
      setTranslatedText(data[0].map((t: any) => t[0]).join(''));
    } catch (err) {
      toast({
        title: "Translation Error",
        description: "Failed to translate text",
        variant: "destructive",
      });
    }
    setIsTranslating(false);
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MicOff className="h-6 w-6" />
            Speech Recognition Not Supported
          </CardTitle>
          <CardDescription>
            Your browser doesn&apos;t support speech recognition. Please use a modern browser like Chrome, Edge, or Safari.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              For the best experience, please use:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Google Chrome (recommended)</li>
              <li>• Microsoft Edge</li>
              <li>• Safari (on macOS/iOS)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayText = transcript + (interimTranscript ? ' ' + interimTranscript : '');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-6 w-6" />
            Speech to Text Converter
          </CardTitle>
          <CardDescription>
            Choose your language and start speaking to convert your voice to text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-muted-foreground" />
              <label className="text-sm font-medium">Language:</label>
            </div>
            <Select 
              value={selectedLanguage} 
              onValueChange={setSelectedLanguage}
              disabled={isRecording}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.nativeName}</span>
                      <span className="text-muted-foreground">({lang.name})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recording Controls */}
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              className="min-w-32"
            >
              {isRecording ? (
                <>
                  <Square className="h-5 w-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </>
              )}
            </Button>

            {isRecording && (
              <Badge variant="secondary" className="animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Recording...
              </Badge>
            )}

            {confidence !== null && (
              <Badge variant="outline">
                Confidence: {Math.round(confidence * 100)}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Text Output */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Transcribed Text
          </CardTitle>
          <CardDescription>
            Your speech will appear here in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-48 p-4 border rounded-lg bg-muted/50 relative">
            {displayText ? (
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                <span>{transcript}</span>
                {interimTranscript && (
                  <span className="text-muted-foreground italic">
                    {interimTranscript}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Click &quot;Start Recording&quot; and begin speaking</p>
                <p className="text-sm mt-1">Your text will appear here</p>
              </div>
            )}
          </div>

          {/* Text Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={copyToClipboard}
              disabled={!transcript.trim()}
              variant="outline"
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>

            <Button
              onClick={downloadText}
              disabled={!transcript.trim()}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>

            <Button
              onClick={speakText}
              disabled={!transcript.trim()}
              variant="outline"
              size="sm"
            >
              {isPlaying ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            <Button
              onClick={clearText}
              disabled={!transcript.trim() && !interimTranscript.trim()}
              variant="outline"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Word Count Stats */}
          {transcript.trim() && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {transcript.trim().split(/\s+/).filter(word => word.length > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {transcript.trim().length}
                </div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {transcript.trim().split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Sentences</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.ceil(transcript.trim().split(/\s+/).filter(word => word.length > 0).length / 200)}
                </div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-6 w-6" />
            Translate Text
          </CardTitle>
          <CardDescription>
            Translate your transcribed text to another language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Target Language Selection */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-muted-foreground" />
              <label className="text-sm font-medium">Translate To:</label>
            </div>
            <Select 
              value={targetLanguage} 
              onValueChange={setTargetLanguage}
              disabled={isRecording}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.nativeName}</span>
                      <span className="text-muted-foreground">({lang.name})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={translateText}
              disabled={!transcript.trim() || isTranslating}
              variant="outline"
              size="sm"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              {isTranslating ? "Translating..." : "Translate"}
            </Button>
          </div>

          {/* Translated Text Display */}
          <div className="min-h-48 p-4 border rounded-lg bg-muted/50">
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {translatedText.trim()}
            </div>
          </div>
        </CardContent>
      </Card>

      {translatedText && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Translated Text
            </CardTitle>
            <CardDescription>
              Translation ({languages.find(l => l.code === targetLanguage)?.name})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-24 p-4 border rounded-lg bg-muted/50 relative">
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {translatedText}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
