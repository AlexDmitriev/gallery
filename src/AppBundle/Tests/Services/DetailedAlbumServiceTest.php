<?php
namespace AppBundle\Tests\Services;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use AppBundle\Entity\DetailedAlbum;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DetailedAlbumServiceTest extends WebTestCase
{
    static $container;
    static $das;

    public static function setUpBeforeClass()
    {
        $kernel = static::createKernel();
        $kernel->boot();

        self::$container = $kernel->getContainer();
        self::$das       = self::$container->get('detailed_album');
    }


    public function testSuccess()
    {
        $result = self::$das->get(1,1);
        $this->assertTrue($result instanceof DetailedAlbum);
    }


    public function testError()
    {
        try{
            self::$das->get(1000,1);
            $this->fail("Expected Not Found exception not thrown");
        } catch(NotFoundHttpException $e) {
            $this->assertEquals("The album does not exist", $e->getMessage());
        }
    }
}

