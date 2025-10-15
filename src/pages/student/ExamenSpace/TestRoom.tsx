import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOAST_TYPE } from "@/constants/ToastType";
import { formatTestTotalSecondTime } from "@/utils/TestRoomUtils";
import { showToast } from "@/utils/Toast";
import { ClockCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { AlertTriangleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const TestRoom: React.FC  = () => {
    const initialSeconds = 0.3 * 60;
    const [tempsRestant, setTempsRestant] = useState(initialSeconds);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const q1 = "courte";
    const q2 = "dev";
    const q3 = "qcm";

     useEffect(() => {
        if (tempsRestant <= 0) {
            onTimeUp();
            return;
        }

        const intervalID = setInterval(() => {
            setTempsRestant(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalID);
    }, [tempsRestant]);

    const onTimeUp = () => {
        setIsFinished(true)
        showToast({
            type: TOAST_TYPE.ERROR,
            message: "Soumission automatique des reponses suite au temps ecoulé !"
        })
    }

    return <div>
        {
            isFinished &&
            <div className="bg-gray-50 opacity-95 h-screen w-screen fixed z-50">
                <div className="h-full w-full flex flex-col justify-center">
                    <div className="w-max mx-auto text-center">
                        <LoadingOutlined className="text-8xl" />
                        <div className="text-xl my-10 font-medium">Soumission de vos reponses...</div>
                        <div className="text-lg my-10 flex gap-2"><AlertTriangleIcon /> Ne fermez pas la navigateur pendant la soumission.</div>
                    </div>
                </div>
            </div>
        }
        <div className="fixed pt-14 w-full px-[12%]">
            <div className="shadow p-4 bg-white flex justify-between items-center">
                <div className="font-bold text-lg">Test de HTML</div>
                    <div className={`${tempsRestant < 11 ? "bg-red-500 animate-pulse" : "bg-gray-400"} border rounded-full py-1 px-3 bg-gray-400 text-white font-bold`}>
                        <ClockCircleOutlined /> {formatTestTotalSecondTime(tempsRestant)}
                    </div>
                    <div className="font-bold text-gray-800">Mr Andry</div>
                </div>
            </div>
        <div className="pt-32 pb-10 px-[12%] min-h-screen">
            <StudentNavigation />
            <div className="">
                <div>
                    <Card className="mb-2 px-4">
                        <div>
                            <div className="text-xs text-gray-600">Question 1</div>
                            <div className="my-1">
                                Qui est la president de Madagascar ?
                            </div>
                            {
                                (q1 === "courte") ?
                                <div className="w-64 mx-auto mt-2">
                                    <Label className="mb-1">Votre reponse :</Label>
                                    <Input />
                                </div> :
                                ((q1 === "dev") ?
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <Input />
                                    </div>
                                    : 
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <div className="flex flex-col gap-4 my-4">
                                            <div className="flex gap-2"><input type="radio" id="opt1" name="opt" /><Label htmlFor="opt1">Option 1</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt2" name="opt" /><Label htmlFor="opt2">Option 2</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt3" name="opt" /><Label htmlFor="opt3">Option 3</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt4" name="opt" /><Label htmlFor="opt4">Option 4</Label></div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                    <Card className="mb-2 px-4">
                        <div>
                            <div className="text-xs text-gray-600">Question 2</div>
                            <div className="my-1">
                                Completer ce code:
                                <div className="border w-1/2 p-2">
                                    beufivb
                                    <br/>   ebvuib
                                </div>
                            </div>
                            {
                                (q2 === "courte") ?
                                <div className="w-64 mx-auto mt-2">
                                    <Label className="mb-1">Votre reponse :</Label>
                                    <Input />
                                </div> :
                                ((q2 === "dev") ?
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <Input />
                                    </div>
                                    : 
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <div className="flex flex-col gap-4 my-4">
                                            <div className="flex gap-2"><input type="radio" id="opt1" name="opt" /><Label htmlFor="opt1">Option 1</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt2" name="opt" /><Label htmlFor="opt2">Option 2</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt3" name="opt" /><Label htmlFor="opt3">Option 3</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt4" name="opt" /><Label htmlFor="opt4">Option 4</Label></div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                    <Card className="mb-2 px-4">
                        <div>
                            <div className="text-xs text-gray-600">Question 3</div>
                            <div className="my-1">
                                Qui est la capitale de Madagascar ?
                            </div>
                            {
                                (q3 === "courte") ?
                                <div className="w-64 mx-auto mt-2">
                                    <Label className="mb-1">Votre reponse :</Label>
                                    <Input />
                                </div> :
                                ((q3 === "dev") ?
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <Input />
                                    </div>
                                    : 
                                    <div className="w-64 mx-auto mt-2">
                                        <Label className="mb-1">Votre reponse :</Label>
                                        <div className="flex flex-col gap-4 my-4">
                                            <div className="flex gap-2"><input type="radio" id="opt1" name="opt" /><Label htmlFor="opt1">Option 1</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt2" name="opt" /><Label htmlFor="opt2">Option 2</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt3" name="opt" /><Label htmlFor="opt3">Option 3</Label></div>
                                            <div className="flex gap-2"><input type="radio" id="opt4" name="opt" /><Label htmlFor="opt4">Option 4</Label></div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                </div>
                <div className="flex justify-center mt-4">
                    <Button>Soumettre</Button>
                </div>
            </div>
        </div>
    </div>
}

export default TestRoom;