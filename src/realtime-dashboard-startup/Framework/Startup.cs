using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(RealtimeAngular.Startup))]
namespace RealtimeAngular
{
    public class Startup
    {
        private BackgroundTicker _backgroundTicker;

        public void Configuration(IAppBuilder app)
        {
            _backgroundTicker = new BackgroundTicker();
            app.MapSignalR();
        }
    }
}