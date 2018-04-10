using System;
namespace TodoApi.Model
{
    public class Task {
        public int Id { get; set; }
        public string Title {get; set;}
        public DateTime DueDate {get; set;}
        public DateTime Added { get; set; }
    }
    
}