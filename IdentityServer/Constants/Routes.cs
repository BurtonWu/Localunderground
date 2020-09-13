using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Constants
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
            public const string Base = "api/billboard";
        }
    }
}
