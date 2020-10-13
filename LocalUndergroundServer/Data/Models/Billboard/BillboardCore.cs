using LocalUndergroundServer.Data.Models;
using LocalUndergroundServer.Data.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static LocalUndergroundServer.Constants.Validation.Post;

namespace LocalUndergroundServer.Data.Models.Billboard
{
    public class BillboardCore
    {
        public int Id { get; set; }
        
        [MaxLength(255)]
        public string Title { get; set; }
        
        [MaxLength(255)]
        public string Description { get; set; }
        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        [Required]
        public string UserId { get; set; }
        
        public User User { get; set; }
        
        public IEnumerable<BillboardImage> PreviewImages { get; set; }
        //comments
        //price history
        //sub categories
        //imbeded video link

    }
}
