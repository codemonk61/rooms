export const fetchRooms = async (page = 1, pageSize = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
   
      const sampleData = [
        {
          "name": "Premier room city view twin bed wfrm 62sqm walk metro station burj khalifa and dubai mall",
          "room_type_code": "939482735",
          "variants_count": 2,
          "variants": [
            {
              "name": "Room Only",
              "total_price": {
                "discounted_price": 2019.08,
                "currency": "MYR"
              },
              "display_properties": [
                {
                  "value": "Room only"
                },
                {
                  "value": "Double bed"
                },
                {
                  "value": "Upto 2 adults"
                }
              ]
            },
            {
              "name": "Breakfast",
              "total_price": {
                "discounted_price": 2192.23,
                "currency": "MYR"
              },
              "display_properties": [
                {
                  "value": "Breakfast included"
                },
                {
                  "value": "Double bed"
                },
                {
                  "value": "Upto 2 adults"
                }
              ]
            }
          ],
          "properties": {
            "video_url": {
              "med": "https://d1tf573zhz3zzy.cloudfront.net/data/content/videos/CantoTranscoded/720p/A+GIRL+WHO+BLOOMS/5en6e54odp661fqhbg8d75kd1l.mp4"
            }
          },
          "additional_info": {
            "short_tariff_notes": "PREMIER ROOM CITY VIEW TWIN BED WFRM 62SQM WALK METRO STATION BURJ KHALIFA AND DUBAI MALL"
          }
        }
      ];


      const rooms = Array.from({ length: pageSize }, (_, i) => {
        const roomNum = (page - 1) * pageSize + i + 1;
        const room = JSON.parse(JSON.stringify(sampleData[0]));
        
    
        room.name = `${room.name} (${roomNum})`;
        room.variants.forEach(variant => {
          variant.total_price.discounted_price += roomNum * 100;
        });
        
        return {
          id: roomNum,
          ...room
        };
      });

      resolve(rooms);
    }, 800);
  });
};