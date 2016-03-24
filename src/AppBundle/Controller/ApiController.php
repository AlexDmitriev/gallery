<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Query;

class ApiController extends Controller
{
    /**
     * @Route("/api")
     */
    public function indexAction()
    {
        $response = new Response(
            $this->container->get('jms_serializer')->serialize(
                $this->getDoctrine()->getRepository('AppBundle:Album')->findAllWithImages(),
                'json'
            )
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;

    }

    /**
     * @Route("/api/{album_id}/{page}", defaults={"page" = 1})
     */
    public function albumAction($album_id, $page)
    {

        $response = new Response(
            $this->container->get('jms_serializer')->serialize(
                $this->get('detailed_album')->get($album_id, $page),
                'json'
            )
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
