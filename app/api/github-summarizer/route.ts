import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { summarizeGithub } from './chain';

async function fetchReadme(githubUrl: string): Promise<string> {
  const urlParts = githubUrl.replace('https://github.com/', '').split('/');
  const owner = urlParts[0];
  const repo = urlParts[1];

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw'
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Il n\'y a pas de ficher readme.md');
    }
    throw new Error('Erreur lors de la récupération du README');
  }

  return response.text();
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Clé API manquante' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Validation de la clé API
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('api_key', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json(
        { success: false, message: 'Clé API invalide' },
        {
          status: 401,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Récupération du githubURL
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Le corps de la requête doit être un JSON valide avec une propriété githubURL' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const { githubURL } = body;
    
    if (!githubURL) {
      return NextResponse.json(
        { success: false, message: 'URL GitHub manquante' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Récupération et conversion du README
    const readmeText = await fetchReadme(githubURL);
    const summary = await summarizeGithub(readmeText);

    return NextResponse.json(
      { 
        success: true, 
        ...summary
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erreur serveur';
    const status = errorMessage === 'Il n\'y a pas de ficher readme.md' ? 404 : 500;

    return NextResponse.json(
      { success: false, message: errorMessage },
      {
        status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}
