import React from "react";
import PlaylistAddIcon from "@mui/icons-material/playlistAdd"; 

const AddToMustWatchIcon = ({ movie }) => {
  return (
    <PlaylistAddIcon
      color="primary"
      fontSize="large"
      titleAccess="Add to Must Watch"
    />
  );
};

export default AddToMustWatchIcon;
