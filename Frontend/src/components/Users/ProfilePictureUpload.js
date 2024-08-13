import React, { useState } from 'react';
import '../../css/profilePictureUpload.css';

function ProfilePictureUpdate() {
    const [base64Image, setBase64Image] = useState('');

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
                console.log(reader.result); // Log Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container'>
            <div>
                <input
                    accept='image/*'
                    type='file'
                    onChange={convertToBase64}
                />
            </div>
            {base64Image && (
                <div>
                    <img src={base64Image} alt="Preview" style={{ width: '100px', height: '100px' }} />
                </div>
            )}
        </div>
    );
}

export default ProfilePictureUpdate;
