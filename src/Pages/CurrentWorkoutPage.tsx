import { MutableRefObject, useEffect, useState } from 'react'

import CurrentWorkout from '../Components/CurrentWorkout/CurrentWorkout'

interface CurrentWorkoutPageProps {
    toolbarRef: MutableRefObject<HTMLDivElement | undefined> | undefined
}

const CurrentWorkoutPage = ({ toolbarRef }: CurrentWorkoutPageProps): JSX.Element => {
    const [currentToolbarRef, setCurrentToolbarRef] = useState<HTMLDivElement | undefined>(
        undefined,
    )

    useEffect(() => {
        setCurrentToolbarRef(toolbarRef?.current)
    }, [toolbarRef?.current])

    return (
        <>
            <CurrentWorkout currentToolbarRef={currentToolbarRef} />
        </>
    )
}

export default CurrentWorkoutPage
