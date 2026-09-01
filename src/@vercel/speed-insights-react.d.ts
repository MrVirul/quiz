declare module '@vercel/speed-insights/react' {
  interface SpeedInsightsProps {
    dsn?: string;
    sampleRate?: number;
    route?: string | null;
    beforeSend?: BeforeSend;
    debug?: boolean;
    scriptSrc?: string;
    endpoint?: string;
  }

  type EventTypes = 'vital';

  interface BeforeSendEvent {
    type: EventTypes;
    url: string;
    route?: string;
  }

  type BeforeSend = (
    event: BeforeSendEvent
  ) => BeforeSendEvent | null | undefined | false;

  export function computeRoute(
    pathname: string | null,
    pathParams: Record<string, string | string[]> | null
  ): string | null;

  export function SpeedInsights(
    props: SpeedInsightsProps & {
      framework?: string;
      basePath?: string;
      configString?: string;
    }
  ): JSX.Element | null;
}
