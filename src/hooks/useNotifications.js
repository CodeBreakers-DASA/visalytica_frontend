"use client";

import { useEffect, useState } from 'react';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchUnread = async () => {
      try {
        const response = await fetch(`http://localhost:3001/notifications/unread/${userId}`);
        const unread = await response.json();
        setNotifications(unread);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchUnread();

    const eventSource = new EventSource(`http://localhost:3001/notifications/${userId}`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...(Array.isArray(prev) ? prev : [])]);
    };

    eventSource.onerror = () => {
    };

    return () => eventSource.close();
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:3001/notifications/read/${notificationId}`, {
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