import { Card, CardContent } from "@mui/material";
import React from "react";

const InfoCards = ({ heading, info, className }) => {
  return (
    <Card sx={{ width: 200, height: 100 }} className={className}>
      <CardContent>
        <div className="card-heading">{heading}</div>
        <p className="card-info">{info}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCards;
