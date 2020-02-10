using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.models
{
    public class GameData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("player")]
        public Player Player { get; set; }
        [BsonElement("funInHours")]
        public int FunInHours { get; set; }
    }
}
