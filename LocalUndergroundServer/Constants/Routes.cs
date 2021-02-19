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
        public static class BillBoard
        {
            public const string PostCard = "api/billboard/postcard";
        }
        public static class Classification
        {
            public const string Base = "api/classification";
        }

        public static class StoryBoard
        {
            public const string Base = "api/storyboard";
            public const string View = "api/storyboard/view";
            public const string Edit = "api/storyboard/edit";
            public const string StudioCard = "api/storyboard/studiocard";

        }
        public static class Widget
        {
            public const string Base = "api/widget";
            public const string Sort = "api/widget/sort";
            public const string Delete = "api/widget/delete";

        }
        public static class TextWidget
        {
            public const string Base = "api/textwidget";
        }

        public static class ImageWidget
        {
            public const string Base = "api/imagewidget";
        }
    }
}
