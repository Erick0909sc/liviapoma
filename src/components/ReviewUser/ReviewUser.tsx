
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Rating } from '@mui/material';

type Props = {};

const ReviewUser = (props: Props) => {
    const { data: userSession } = useSession();
    const [isReviewing, setReviewing] = useState(false);
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');

    const startReview = () => {
        setReviewing(true);
    };

    const cancelReview = () => {
        setReviewing(false);
        setRating(0);
        setComment('');
    };

    // maquetado de comentarios 





    const saveReview = () => {

        cancelReview();
    };

    return (
        <div className="p-4 flex flex-col  border-2 w-[45%] rounded-lg shadow-lg">
            {userSession ? (
                <div className="flex items-center justify-between pl-2">
                    <div className=' flex items-center gap-2'>
                        <img
                            src={userSession.user.image}
                            alt={userSession.user.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="text-xl font-semibold">
                            {userSession.user.name}
                        </div>
                    </div>

                    {!isReviewing ? (
                        <button
                            onClick={startReview}
                            className="bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Realizar Comentario
                        </button>
                    ) : null}
                </div>
            ) : (
                <p>Debes estar autenticado para realizar una revisión.</p>
            )}
            {isReviewing ? (
                <div className=" rounded p-4 space-y-2  ">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            //   setRating(newValue);
                        }}
                    />
                    <label className="block">
                        Comentario:
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="block border p-2 rounded w-[100%] h-[15vh]"
                        />
                    </label>
                    <div className="flex space-x-4">
                        <button
                            onClick={saveReview}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={cancelReview}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default ReviewUser;
