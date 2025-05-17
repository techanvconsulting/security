import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEOHelmet = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  twitterImage,
  schema
}) => {
  const defaultTitle = "TECHANV Security - Enterprise Cybersecurity Solutions";
  const defaultDescription = "TECHANV Security provides enterprise-grade cybersecurity solutions including SIEM, XDR, EDR, and SOAR with advanced threat protection.";
  const defaultKeywords = "TECHANV, cybersecurity, SIEM, XDR, EDR, SOAR, threat protection, security monitoring";
  const siteUrl = "https://security.techanv.com";

  // Use default values if props aren't provided
  const pageTitle = title ? `${title} | TECHANV Security` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const canonical = canonicalUrl || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

SEOHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  twitterImage: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SEOHelmet;
