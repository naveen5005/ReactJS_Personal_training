import React from "react";
import Box from "@mui/material/Box";

const MuiBox = () => {
  return (
    <>
      <Box component={'p'} sx={{p:2,border:'2px solid red'}}>This Is Box Element !!</Box>
    </>
  );
};

export default MuiBox;
