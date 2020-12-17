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

        public static class StoryBoard
        {
            public const string BaseStoryBoard = "api/storyboard";
        }
        public static class Widget
        {
            public const string BaseWidget = "api/widget";
        }
        public static class TextWidget
        {
            public const string BaseTextWidget = "api/textwidget";
        }
    }
}
