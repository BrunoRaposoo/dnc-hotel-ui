/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getReservationsByUser } from '../reservations/actions';
import axios from '../../../api';
import { User, UserProfile } from '@/src/types/User';
import { decryptToken } from '@/src/helpers/decryptToken';
import { getHotelByOwner } from '../hotels/actions';

export async function getProfile(): Promise<UserProfile> {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) redirect('/login')

    const {id} = decryptToken(accessToken)

    const { data } = await axios.get<User>(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (data.role === 'ADMIN') {
        const hotels = await getHotelByOwner();

        if (hotels) {
            return { ...data, hotels }
        }

        return data;

    } else {
        const [reservation] = await getReservationsByUser();
    
        
        if (reservation) {
            return {...data, lastReservation: reservation}
        }
    
        return data;
    }

}

export async function updateProfile(prevState: any, formData: FormData): Promise<User> {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) redirect('/login')

    try {
        const avatar = formData.get('avatar') as File;
    
        const {id} = decryptToken(accessToken)
    
        const payload = {
            "name": formData.get('name'),
            "email": formData.get('email'),
        }
    
        axios.patch(`/users/${id}`, payload,  {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    
        if (avatar.size) {
            const formDataAvatar = new FormData()
            formDataAvatar.set('avatar', avatar)
    
            await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
    } catch (error) {
        console.log('Tratar o erro: ', error)
    }

    redirect('/perfil')

}