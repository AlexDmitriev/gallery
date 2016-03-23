<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Query;
use AppBundle\Entity\DetailedAlbum;

class ApiController extends Controller
{
    const IMAGES_PER_PAGE = 10;

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
        $album  = $this->getDoctrine()->getRepository('AppBundle:Album')->find($album_id);

        $result = $this->get('knp_paginator')->paginate(
            $this->getDoctrine()->getRepository('AppBundle:Album')->getAlbumImagesQuery($album_id), $page, self::IMAGES_PER_PAGE
        );

        $detailedAlbum = new DetailedAlbum();
        $detailedAlbum->setId($album->getId());
        $detailedAlbum->setName($album->getName());
        $detailedAlbum->setResult($result);

        $response = new Response(
            $this->container->get('jms_serializer')->serialize(
                $detailedAlbum,
                'json'
            )
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
