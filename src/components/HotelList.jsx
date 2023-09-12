import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Typography,
  Stack,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";
const fetchHotels = async () => {
  const res = await fetch("http://localhost:3001/hotels");
  if (!res.ok) {
    throw new Error("Network response was not Ok");
  }
  return res.json();
};
function HotelList() {
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error fetching ${error.message} </div>;
  }
  return (
    <div>
      <Typography variant="h4" color="initial" component="h2">
        Booking App
      </Typography>
      <Stack spacing={2}>
        {hotels.map((hotel) => (
          <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
              <CardMedia
                sx={{ height: 140 }}
                title={hotel.name}
                image={hotel.image}
                component="img"
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {hotel.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See Details</Button>
              </CardActions>
            </Card>
          </Link>
        ))}
      </Stack>
    </div>
  );
}
export default HotelList;
