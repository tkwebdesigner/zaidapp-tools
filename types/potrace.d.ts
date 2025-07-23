declare module 'potrace' {
  interface PotraceOptions {
    type?: 'svg' | 'eps' | 'pdf' | 'dxf';
    threshold?: number;
    turdSize?: number;
    turnPolicy?: 'black' | 'white' | 'left' | 'right' | 'minority' | 'majority';
    alphaMax?: number;
    optCurve?: boolean;
    optTolerance?: number;
    background?: string;
    color?: string;
    width?: number;
    height?: number;
  }

  interface Potrace {
    trace(
      buffer: Buffer,
      options: PotraceOptions,
      callback: (err: Error | null, svg: string) => void
    ): void;
    
    trace(
      buffer: Buffer,
      callback: (err: Error | null, svg: string) => void
    ): void;
  }

  export const Potrace: Potrace;

  export function trace(preProcessedBuffer: Buffer, arg1: { type: string; }, arg2: (err: any, svg: any) => void) {
    throw new Error('Function not implemented.');
  }
}
