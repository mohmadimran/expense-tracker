import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, currentPage, itemsPerPage, totalPages, setCurrentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Button
        sx={{
          borderRadius: "50%", 
          color: "#9B9B9B",    
          background: "#F1F1F1", 
          width: "24px",       
          height: "24px",     
          minWidth: "unset",   
          padding: 0,          
          display: "flex",     
          justifyContent: "center", 
          alignItems: "center",
        }}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>
      <Box
        component="span"
        sx={{ borderRadius: "5px", background: "#43967B", color: "#9B9B9B",width:"24px",height:'24px',textAlign:"center"
       }}
      >
        {currentPage}
      </Box>
      <Button
        sx={{
          borderRadius: "50%", 
          color: "#9B9B9B",   
          background: "#F1F1F1", 
          width: "24px",      
          height: "24px",      
          minWidth: "unset",   
          padding: 0,          
          display: "flex",    
          justifyContent: "center", 
          alignItems: "center", 
        }}
        onClick={handleNext}
        disabled={currentPage === totalPages || totalItems === 0}
      >
        {">"}
      </Button>
    </div>
  );
}
