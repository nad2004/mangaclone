import { Box , CardContent, CardMedia, Typography, Card, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MangaCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
    const theme = useTheme();

    return (
    <Card
      sx={{
        bgcolor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
      onClick={() => navigate(`/manga/${item._id}`)}
      elevation={1}
    >
      <CardMedia
        component="img"
        image={item.cover_image}
        alt={item.title}
        sx={{ height: 220, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
          {item.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          4.6m • 74,197
        </Typography>
        <Box sx={{ pt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Box
            component="span"
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
              color: "text.primary",
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.675rem",
            }}
          >
            Genre
          </Box>
          <Box
            component="span"
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
              color: "text.primary",
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.675rem",
            }}
          >
            Genre
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MangaCard;