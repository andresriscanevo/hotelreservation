import useStore from "../store";
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@mui/material";
import toast from "react-hot-toast";
function BookingForm({ hotel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addReservation = useStore((state) => state.addReservation);
  const onSubmit = (data) => {
    addReservation(hotel, data);
    toast.success("Reservation Complete");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="date" {...register("startDate", { required: true })} />
      {errors.startDate && (
        <Typography style={{ color: "red" }}>Start Day is required</Typography>
      )}
      <Input type="date" {...register("endDate", { required: true })} />
      {errors.endDate && (
        <Typography style={{ color: "red" }}>End Day is required</Typography>
      )}
      <br />
      <br />
      <Button variant="contained" type="submit">
        Make Reservation
      </Button>
    </form>
  );
}
export default BookingForm;
