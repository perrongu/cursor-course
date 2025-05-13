import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    // Vérification de la clé API dans Supabase
    const { data, error } = await supabase
      .from('api_keys')  // TODO: Remplacer par le nom exact de votre table
      .select('*')
      .eq('api_key', apiKey)  // TODO: Remplacer par le nom exact de la colonne
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la validation de la clé' },
        { status: 500 }
      );
    }

    if (data) {
      // La clé existe dans la base de données
      return NextResponse.json({ 
        success: true,
        message: 'Clé API valide'
      });
    } else {
      // La clé n'existe pas dans la base de données
      return NextResponse.json(
        { success: false, message: 'Clé API invalide' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 