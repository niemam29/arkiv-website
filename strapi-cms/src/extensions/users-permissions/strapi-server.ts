// Declare global strapi instance
declare const strapi: any;

export default (plugin) => {
  // Add email domain validation for OAuth callback
  const originalCallback = plugin.controllers.auth.callback;

  plugin.controllers.auth.callback = async (ctx) => {
    // Call original callback first
    await originalCallback(ctx);

    // Validate email domain after authentication
    if (ctx.body && ctx.body.user && ctx.body.user.email) {
      const email = ctx.body.user.email;
      const allowedDomain = '@golem.network';

      if (!email.endsWith(allowedDomain)) {
        // Delete the user if they were created with wrong domain
        if (ctx.body.user.id) {
          await strapi.db.query('plugin::users-permissions.user').delete({
            where: { id: ctx.body.user.id }
          });
        }

        ctx.status = 403;
        ctx.body = {
          error: 'Forbidden',
          message: 'Only @golem.network email addresses are allowed to access this CMS.',
        };
        return;
      }
    }
  };

  return plugin;
};
