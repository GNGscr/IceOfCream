import React from 'react';
import { motion } from 'framer-motion';
import { useRive, useStateMachineInput } from 'rive-react';

const STATE_MACHINE_NAME = "State Machine 1";

const SectionAnimation = ({ menuIsActive, media }) => {

    const {rive, RiveComponent} = useRive({
        src: "dolphin.riv",
        autoplay: true,
        stateMachines: STATE_MACHINE_NAME
    })

    const stateSuccess = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'Timeline 1'
    )
    const triggerSuccess = () => {
        stateSuccess && stateSuccess.fire();
    }
    
    if (rive) {
      triggerSuccess()
    }
    
    return (
        <motion.div
        style={{borderRadius: '50%'}}
            className="slide-in"
            initial={{ opacity: 0 }}
            animate={ menuIsActive ? { opacity: 1 } : { opacity: 0 } }
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                className={`flex justify-center align-center`}
                style={{
                    padding: "0",
                    borderRadius: "50%",
                    background: "#000"
                }}>
                    <RiveComponent
                        style={{
                            width: media === 'mobile' ? '300px' : '400px',
                            height: media === 'mobile' ? '300px' : '400px',
                            borderRadius: "50%",
                            marginTop: "0rem",
                            clipPath: 'circle(40%)'
                        }}
                        src="dolphin.riv"
                    />

            </motion.div>
        </motion.div>
    );
};

export default SectionAnimation;