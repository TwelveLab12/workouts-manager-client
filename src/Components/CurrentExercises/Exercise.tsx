import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from "@mui/material"
import { ExerciseProps } from "../../types/types"
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material'
import { useState } from "react"
import { theme } from "../../theme/theme"

const Exercise = ({ exercise }: { exercise: ExerciseProps }): JSX.Element => {
    const [currentExercise, setCurrentExercise] = useState<ExerciseProps>(exercise)
    const incrementCounter = () => {
        setCurrentExercise((exercisePrevState) => { return { ...exercisePrevState, counter: ++exercisePrevState.counter } })
    }

    const decrementCounter = () => {
        if (currentExercise.counter > 0) {
            setCurrentExercise((exercisePrevState) => { return { ...exercisePrevState, counter: --exercisePrevState.counter } })
        }
    }

    return (
        <>
            <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: '15rem', alignItems: 'normal', justifyContent: 'center' }}
                >
                    <CardHeader title={exercise.label} />
                    <CardContent
                        sx={{
                            height: '100%',
                            backgroundColor: theme.palette.grey.A100,
                        }}
                    >
                        <Stack direction={'column'}
                            justifyContent="space-between"
                            sx={{ height: '100%' }}
                        >
                            <Typography>{exercise.description ?? ' this is a description '}</Typography>
                            <Box alignSelf={"center"}>
                                <Typography variant="h3">{currentExercise.counter}</Typography>
                            </Box>
                            <Stack direction={'row'} justifyContent="center" alignItems={"center"} spacing={3} t  >
                                <IconButton onClick={decrementCounter} ><RemoveCircleOutlined sx={{ fontSize: '2.2rem' }} /></IconButton>
                                <IconButton onClick={incrementCounter} ><AddCircleOutlined sx={{ fontSize: '2.2rem' }} /></IconButton>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent>
                        <Stack>
                            <div>{exercise.id}</div>
                            <div>{exercise.label}</div>
                            <div>{exercise.description}</div>
                            <div>{exercise.counter}</div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent>
                        <Stack>
                            <div>{exercise.id}</div>
                            <div>{exercise.label}</div>
                            <div>{exercise.description}</div>
                            <div>{exercise.counter}</div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent>
                        <Stack>
                            <div>{exercise.id}</div>
                            <div>{exercise.label}</div>
                            <div>{exercise.description}</div>
                            <div>{exercise.counter}</div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent>
                        <Stack>
                            <div>{exercise.id}</div>
                            <div>{exercise.label}</div>
                            <div>{exercise.description}</div>
                            <div>{exercise.counter}</div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default Exercise