'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pb } from '@/lib/pocketbase';
import { title } from 'process';
import React, { useEffect, useState } from 'react'

export default function TestPage() {
  const [products, setProducts] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const ferchProduct = async () => {
    try {
      const record = await pb.collection('product').getFullList({
        sort: '-created',
      });
      setProducts(record)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    ferchProduct()
  }, [])
  const deleteProduct = async (id) => {
    try {
      await pb.collection('product').delete(id);
      setProducts(products.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }
  const data = {
    "title": "test",
    "price": 123,
    "active": true
};

  const updatedProduct = async(id)=> {
    try {
       await pb.collection('product').update(id, {title:newTitle});
      setProducts(products.map(item =>  item.id === id ? {...item, title:newTitle} : item ))
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div><Input
    className='m-7'
    type='text'
    value={newTitle}
    onChange={(e) =>  setNewTitle(e.target.value)}

     />
      {products.map(item => (
        <>
          
        <div
          key={item.id}>{item.title}
        
          <Button variant={'default'} onClick={() => updatedProduct(item.id)} >updated</Button>
          <Button variant={'destructive'} onClick={() => deleteProduct(item.id)} >delete</Button>
        </div>
          </>
      ))}
    </div>
  )
}
