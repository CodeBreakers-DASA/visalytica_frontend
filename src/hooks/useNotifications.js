"use client";

import { useEffect, useState } from 'react';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('useNotifications - userId recebido:', userId);
    if (!userId) {
      console.log('useNotifications - userId é null/undefined, retornando');
      return;
    }

    const getApiUrl = () => {
      return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'https://nest-visalytica.onrender.com';
    };

    const apiUrl = getApiUrl();
    console.log('API URL:', apiUrl, 'User ID:', userId);

    const fetchUnread = async () => {
      try {
        console.log('Fazendo requisição para:', `${apiUrl}/notifications/unread/${userId}`);
        const response = await fetch(`${apiUrl}/notifications/unread/${userId}`);
        console.log('Response status:', response.status);
        const unread = await response.json();
        console.log('Notificações recebidas:', unread);
        setNotifications(unread);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchUnread();

    const eventSource = new EventSource(`${apiUrl}/notifications/${userId}`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      console.log('Nova notificação via EventSource:', notification);
      setNotifications(prev => [notification, ...(Array.isArray(prev) ? prev : [])]);
    };

    eventSource.onerror = (error) => {
      console.error('Erro no EventSource:', error);
      console.log('EventSource readyState:', eventSource.readyState);
    };

    return () => {
      console.log('useNotifications - Fechando EventSource');
      eventSource.close();
    };
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      const getApiUrl = () => {
        return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'https://nest-visalytica.onrender.com';
      };

      const apiUrl = getApiUrl();
      await fetch(`${apiUrl}/notifications/read/${notificationId}`, {
        method: 'PATCH'
      });
      setNotifications(prev => 
        Array.isArray(prev) ? prev.map(n => n.id === notificationId ? {...n, read: true} : n) : []
      );
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  return { notifications, markAsRead };
}