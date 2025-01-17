import {Box, Input, InputAdornment, Step, StepContent, StepLabel, Stepper} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import IconButton from '../components/Button/IconButton';
import Letter from '../components/Icon/Letter';
import Remix from '../components/Icon/Remix';
import {LeyLine} from '../core/LeyLine';
import sys from '../core/sys';
import Page from '../templates/Page';

export default function Terminal() {

    // LeyLine
    const {
        os
    } = useContext(LeyLine)

    // States
    const [activeStep, _activeStep] = useState(0)
    const [entryAnimation, _entryAnimation] = useState(true)
    const [exitAnimation, _exitAnimation] = useState(true)
    const [fileContent, _fileContent] = useState('')
    const [filename, _filename] = useState('')
    const [password, _password] = useState('')
    const [showPassword, _showPassword] = useState(false)

    // Functions
    const turnOffTerminal = () => {
        setTimeout(() => {
            _exitAnimation(false)
            setTimeout(() => os.terminalOff(), 1200)
        }, 2500)
    }
    const stepAhead = () => _activeStep(stp => stp + 1)
    const unlockIrminsul = () => {
        if (filename === '') {
            os.msgOn(3, 'Data source cannot be empty.', 3)
        } else if (password === '') {
            os.msgOn(3, 'Password cannot be empty.', 3)
        } else {
            os.msgOn(0, 'Processing...')
            sys.cipher(fileContent, password, resp => {
                os._irminsul(resp.data)
                os._apiKey(password)
                os.msgOn(1, 'Successfully unlocked', 3)
                stepAhead()
                turnOffTerminal()
            }, resp => {
                os.msgOn(3, 'Failed to unlock irminsul.', 3)
            })
        }
    }
    const escapeUnlock = () => {
        _exitAnimation(false)
        setTimeout(() => os.terminalOff(), 1200)
    }
    const onFileSelect = e => {
        sys.upload(e.target.files[0], (e) => _fileContent(e))
        _filename(e.target.files[0].name.split(' --v')[0])
    }

    // Styles
    const sx = {
        alignItems: 'center',
        backgroundColor: entryAnimation ? '#fdfdfd00' : '#fdfdfdff',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        opacity: exitAnimation ? 1 : 0,
        transition: 'background-color 1s ease 1.5s, opacity 1s ease',
        width: '100%',
        '& .Logo': {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
            '& svg': {
                height: '30vh',
                opacity: entryAnimation ? 1 : 0,
                overflow: 'visible',
                position: 'absolute',
                top: entryAnimation ? '35vh' : '-10vh',
                transform: entryAnimation ? 'scale(1)' : 'scale(.3)',
                transition: 'all 1s ease 3.5s',
                '& path': {
                    fill: 'gray',
                    opacity: entryAnimation ? 0 : 1,
                    transition: 'all 1.5s ease',
                    '&:first-of-type': {
                        transform: entryAnimation ? 'translateY(-100%)' : 'translateY(0)',
                        fill: '#81C784'
                    },
                    '&:nth-of-type(2)': {
                        transform: entryAnimation ? 'translateY(100%)' : 'translateY(0)',
                        fill: '#388E3C'
                    },
                    '&:nth-of-type(3)': {
                        transform: entryAnimation ? 'translateX(-100%)' : 'translateX(0)',
                        fill: '#4CAF50'
                    },
                    '&:nth-of-type(4)': {
                        transform: entryAnimation ? 'translateX(100%)' : 'translateX(0)',
                        fill: '#4CAF50'
                    }
                }
            }
        },
        '& .Name': {
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            position: 'absolute',
            top: '0',
            width: '100%',
            '&>div': {
                position: 'absolute',
                top: '20vh',
                '& svg': {
                    fill: '#81C784',
                    height: '23px',
                    margin: '0 16px',
                    opacity: entryAnimation ? 0 : 1,
                    transform: entryAnimation ? 'rotateY(90deg)' : 'rotateY(0deg)',
                    transition: 'all 2s ease 3.5s',
                }
            },
        },
        '& .Form': {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            opacity: entryAnimation ? 0 : 1,
            position: 'absolute',
            top: '0',
            transition: 'all 2s ease 3.5s',
            width: '100%',
            '& .Stepper': {
                transition: 'width 1s ease',
                width: 'fit-content',
                '& .MuiStepLabel-label': {
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '30px',
                    justifyContent: 'space-between',
                    paddingRight: '7px',
                    userSelect: 'none'
                }
            }
        },
        '& .Escape': {
            top: '15px',
            right: '15px',
            margin: 'auto',
            opacity: entryAnimation ? 0 : 1,
            position: 'absolute',
            transition: 'opacity 2s ease 3.5s, border .3s ease',
        }
    }

    // Effects
    useEffect(() => {
        _entryAnimation(false)
    }, [])

    return (
        <Page defaultColor>
            {/*<Message on text='nimama' type={1} loading/>*/}
            <Box sx={sx}>
                <Box className='Logo'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-20 -29 40 60'>
                        <path d='M 0 -2 L -7 -10 L 0 -29 L 7 -10 Z'/>
                        <path d='M 0 2 L -7 10 L 0 31 L 7 10 Z'/>
                        <path d='M -1 0 L -9 -8 L -20 0 L -9 8 Z'/>
                        <path d='M 1 0 L 9 -8 L 20 0 L 9 8 Z'/>
                    </svg>
                </Box>
                <Box className='Name'>
                    <div>
                        <Letter.A/>
                        <Letter.K/>
                        <Letter.A/>
                        <Letter.S/>
                        <Letter.H/>
                        <Letter.A/>
                    </div>
                </Box>
                <Box className='Form'>
                    <Stepper className='Stepper' activeStep={activeStep} orientation='vertical'>
                        <Step key={0}>
                            <StepLabel onClick={() => _activeStep(0)}>
                                {filename === '' ? 'Select File to Upload' : filename}
                            </StepLabel>
                            <StepContent className='StepperContent'>
                                <Input
                                    disabled
                                    value={filename}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton component='label' icon={<>
                                                <input hidden type='file' accept='.irminsul' onChange={onFileSelect}/>
                                                <Remix.upload fontSize='small'/>
                                            </>}

                                                        tooltip={"Upload File"}
                                            />
                                            <IconButton disabled={filename === ''} icon={<Remix.arrowRightCircle fontSize='small'/>}
                                                        onClick={stepAhead}
                                            tooltip={"Next Step"}
                                            />
                                        </InputAdornment>
                                    }
                                />
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>
                                {password === '' ? 'Enter Your Password' : '!@#$%^&*'}
                            </StepLabel>
                            <StepContent>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => _password(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                icon={showPassword ? <Remix.eye fontSize='small'/> : <Remix.eyeOff fontSize='small'/>}
                                                onClick={() => _showPassword(pre => !pre)}
                                                tooltip={"Show / Hide Password"}
                                            />
                                            <IconButton icon={<Remix.arrowRightCircle fontSize='small'/>} onClick={unlockIrminsul}
                                                        tooltip={"Next Step"}/>
                                        </InputAdornment>
                                    }
                                />
                            </StepContent>
                        </Step>
                    </Stepper>
                    <IconButton className='Escape' icon={<Remix.fileLock/>} onClick={escapeUnlock}
                                tooltipPosition={"left"}
                                tooltip={"Create New / Keep Editing"}/>
                </Box>
            </Box>
        </Page>
    )
}