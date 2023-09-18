import Script from 'next/script';

interface GoogleAnalyticsProps {
  id: string;
}

export function GoogleAnalytics({ id }: GoogleAnalyticsProps) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} async />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
