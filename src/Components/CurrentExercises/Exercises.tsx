
import { Box, Container, Grid } from "@mui/material"
import { Dispatch } from "react"
import { ExerciseProps } from "../../types/types"
import Exercise from "./Exercise"

const Exercises = ({ exercises, setExercises }: { exercises: ExerciseProps[] | undefined, setExercises: Dispatch<any> }): JSX.Element => {
    return (

        <Container maxWidth="lg" sx={{ mt: 4, py: 2 }}>
            <Grid container spacing={1} rowSpacing={2} justifyContent={'center'}>
                {(!exercises)
                    ? <> U dont have any exercises</>
                    : <>{
                        exercises?.map((exercise) => <Exercise key={exercise.id} exercise={exercise} />)
                    }</>
                }
            </Grid>
        </Container>


    )
}

export default Exercises
