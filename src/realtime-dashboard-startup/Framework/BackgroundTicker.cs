using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace RealtimeAngular
{
    public class BackgroundTicker : IRegisteredObject
    {
        private Timer taskTimer;
        private IHubContext hub;

        public double bandwithPct = 20.0;
        public double cpuPct = 10.0;
        public double salesAmt = 1000.0;
        public double alphaSalesAmt = 700.0;
        public double betaSalesAmt = 300.0;



        public BackgroundTicker()
        {
            HostingEnvironment.RegisterObject(this);

            hub = GlobalHost.ConnectionManager.GetHubContext<MetricHub>();

            taskTimer = new Timer(OnTimerElapsed, null, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(.1));
        }

        private void OnTimerElapsed(object sender)
        {
            hub.Clients.All.broadcastMessage(DateTime.UtcNow.ToString(), bandwithPct,
                cpuPct, salesAmt, alphaSalesAmt, betaSalesAmt);


            // Update Values
            Random r = new Random();

            bandwithPct += 15 * r.NextDouble() - 7.5;
            if (bandwithPct > 100) bandwithPct = 100;
            if (bandwithPct < 0) bandwithPct = 0;

            cpuPct += 15 * r.NextDouble() - 7.5;
            if (cpuPct > 100) cpuPct = 100;
            if (cpuPct < 0) cpuPct = 0;

            alphaSalesAmt += 10 * r.NextDouble();
            if (alphaSalesAmt < 0) alphaSalesAmt = 0;

            betaSalesAmt += 10 * r.NextDouble();
            if (betaSalesAmt < 0) betaSalesAmt = 0;

            salesAmt = alphaSalesAmt + betaSalesAmt;
        }

        public void Stop(bool immediate)
        {
            taskTimer.Dispose();

            HostingEnvironment.UnregisterObject(this);
        }
    }
}

