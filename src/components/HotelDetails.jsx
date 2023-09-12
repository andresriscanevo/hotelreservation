import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import {
  Typography,
  Stack,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";

const fetchHotel = async (id) => {
  const res = await fetch(`http://localhost:3001/hotels/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not Ok");
  }
  return res.json();
};

function HotelDetails() {
  const { params } = useRoute("/hotel/:id");

  if (!params.id) {
    return <div>Hotel ID not provided.</div>;
  }

  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => fetchHotel(params.id),
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error fetching {error.message}</div>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, backgroundColor: "#22a3a3" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={hotel.image}
          title={hotel.name}
          component="img"
          alt={hotel.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.name}
          </Typography>
          <Typography gutterBottom variant="body2" color={"text.secondary"}>
            {hotel.description}
          </Typography>
        </CardContent>
        <CardActions>
          <h1>Form</h1>
        </CardActions>
      </Card>
    </>
  );
}

export default HotelDetails;
