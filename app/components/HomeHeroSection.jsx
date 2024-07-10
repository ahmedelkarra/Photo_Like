import * as React from "react"
import { Box, Grid, Typography } from "@mui/material"
import photo from '../src/assets/photo-hero.avif'



export default function HomeHeroSection({
    title = "Welcome to Photo Like ,",
    subtitle = "the perfect destination for storing and sharing your images easily and securely! We offer a top-notch image hosting service that caters to your needs, whether you're a professional photographer looking for a safe place to store your work, or a casual user wanting to share personal moments with friends and family.",
}) {
    return (
        <Grid container width={'75%'} margin={'10px auto'} columnSpacing={2}>
            <Grid item xs={12} md={7} xl={8}>
                <Box
                    sx={{
                        flex: 1,
                        height: "30vh",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 2,
                        my: 6,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "20px", sm: "35px", md: "40px" },
                            fontWeight: 800,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "lg",
                            color: "gray.500",
                            maxWidth: "54ch",
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={5} xl={4}>
                <img src={photo} alt="photo-hero-section" height={'100%'} width={'100%'} />
            </Grid>
        </Grid>
    )
}
