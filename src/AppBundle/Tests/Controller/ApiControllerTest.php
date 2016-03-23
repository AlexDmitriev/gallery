<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/api');
    }

    public function testAlbum()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/api/:id');
    }

}
