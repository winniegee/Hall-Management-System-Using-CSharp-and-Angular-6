using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gwen
{
    public class CorsMiddleWare
    {
        private readonly RequestDelegate _next;
        public CorsMiddleWare(RequestDelegate next)
        {
            _next = next;
        }
        public Task Invoke(HttpContext httpContext)
        {
            httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
            httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization, Client-Security-Token, Accept-Encoding");
            httpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST, GET,PUT, PATCH,DELETE,OPTIONS");
            return _next(httpContext);
        }
    }
    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class CorsMiddlewareExtensions
    {
        public static IApplicationBuilder UseCorsMiddleWare(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CorsMiddleWare>();
        }
    }
}
