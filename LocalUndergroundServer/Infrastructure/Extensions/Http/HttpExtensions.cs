using LocalUndergroundServer.Data.Interfaces;
using LocalUndergroundServer.Data.Shared;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace LocalUndergroundServer.Infrastructure.Extensions.Http
{
    public static class HttpExtensions
    {
        public static List<ByteDataModel> PopulatePostBodyModel(this HttpRequest request, IEnumerable<string> fileExtensions = null)
        {
            //foreach (var formFile in request.Form)
            //{
            //    model.GetType().GetProperty(formFile.Key, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance)
            //        .SetValue(model, formFile.Value.FirstOrDefault());
            //}
            var byteDataList = new List<ByteDataModel>();
            if(request.Form.Files.Any() && fileExtensions != null && fileExtensions.Count() > 0)
            {
                foreach(var formFile in request.Form.Files)
                {
                    var filename = Path.GetFileName(formFile.FileName);
                    var fileExtension = Path.GetExtension(formFile.FileName).ToLower();
                    var fileSize = formFile.Length;

                    if (fileExtensions.Contains(fileExtension))
                    {
                        using (var fileStream = formFile.OpenReadStream())
                        {
                            var stream = new MemoryStream();
                            fileStream.CopyTo(stream);
                            var bytes = stream.ToArray();

                            byteDataList.Add(new ByteDataModel()
                            {
                                FileName = filename,
                                ByteData = bytes,
                                Size = fileSize
                            });
                        }
                    }
                }
            }
            return byteDataList;
        }
    }
}
