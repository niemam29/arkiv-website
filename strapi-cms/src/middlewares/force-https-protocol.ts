export default () => {
  return async (ctx, next) => {
    // Force protocol to https for admin routes when behind proxy
    if (ctx.request.url.startsWith('/admin')) {
      // Override the protocol getter
      Object.defineProperty(ctx.request, 'protocol', {
        get() {
          return 'https';
        },
        configurable: true,
      });

      // Override the secure getter
      Object.defineProperty(ctx.request, 'secure', {
        get() {
          return true;
        },
        configurable: true,
      });
    }
    await next();
  };
};
