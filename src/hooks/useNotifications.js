"use client";

import { useEffect, useState } from 'react';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const getApiUrl = () => {
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          return 'http://localhost:3001';
        }
      }
      return 'https://nest-visalytica.onrender.com';
    };

    const apiUrl = getApiUrl();
    console.log('API URL:', apiUrl, 'User ID:', userId);

    const fetchUnread = async () => {
      try {
        const response = await fetch(`${apiUrl}/notifications/unread/${userId}`);
        const unread = await response.json();
        setNotifications(unread);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchUnread();

    const eventSource = new EventSource(`${apiUrl}/notifications/${userId}`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...(Array.isArray(prev) ? prev : [])]);
    };

    eventSource.onerror = (error) => {
      console.error('Erro no EventSource:', error);
    };

    return () => eventSource.close();
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      const getApiUrl = () => {
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3001';
          }
        }
        return 'https://nest-visalytica.onrender.com';
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