using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Constants
{
    public static class Routes
    {
        public static class Identity
        {
            public const string Login = "api/user/login";
            public const string Register = "api/user/register";
        }

        public static class Billboard
        {
            public const string BaseBillboard = "api/billboard";
            public const string Details = "api/billboard/details";
        }

        public static class Panel
        {
            public const string BasePanel = "api/panel";
            public const string UploadImage = "api/panel/uploadimage";
        }
    }
}
