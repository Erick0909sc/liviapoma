import React from 'react';
import Link from 'next/link';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-16 right-0 z-50">
            <div className="bg-white rounded-lg p-4 text-black text-[15px]">
                <ul className="space-y-3">
                    <li>
                        <Link href="#">
                            <a onClick={onClose}>Perfil de Usuario</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register">
                            <a onClick={onClose}>Iniciar Sesión</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserModal;