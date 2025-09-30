import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

export const useMeta = (options: MetaOptions) => {
  useEffect(() => {
    // Update document title
    document.title = options.title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update standard meta tags
    if (options.description) {
      updateMeta('description', options.description);
    }
    
    if (options.keywords) {
      updateMeta('keywords', options.keywords);
    }

    // Update Open Graph tags
    updateMeta('og:title', options.ogTitle || options.title, true);
    if (options.ogDescription || options.description) {
      updateMeta('og:description', options.ogDescription || options.description!, true);
    }
    if (options.ogUrl) {
      updateMeta('og:url', options.ogUrl, true);
    }

    // Update Twitter tags
    updateMeta('twitter:title', options.ogTitle || options.title, true);
    if (options.ogDescription || options.description) {
      updateMeta('twitter:description', options.ogDescription || options.description!, true);
    }
    if (options.ogUrl) {
      updateMeta('twitter:url', options.ogUrl, true);
    }

  }, [options.title, options.description, options.keywords, options.ogTitle, options.ogDescription, options.ogUrl]);
};