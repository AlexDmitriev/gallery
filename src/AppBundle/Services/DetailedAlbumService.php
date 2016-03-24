<?php
namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;
use Knp\Component\Pager\Paginator;
use AppBundle\Entity\DetailedAlbum;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;


class DetailedAlbumService
{
    const IMAGES_PER_PAGE = 10;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $em;

    /**
     * @var \Knp\Component\Pager\Paginator
     */
    private $paginator;

    public function __construct(Paginator $paginator, EntityManager $em)
    {
        $this->em = $em;
        $this->paginator = $paginator;
    }


    /**
     * Create DetailedAlbum instance based on album_id and current page
     *
     * @param int $album_id, int $page
     * @return DetailedAlbum
     */
    public function get($album_id, $page)
    {
        $album  = $this->em->getRepository('AppBundle:Album')->find($album_id);

        if (!$album) {
            throw new NotFoundHttpException('The album does not exist');
        }

        $result = $this->paginator->paginate(
            $this->em->getRepository('AppBundle:Album')->getAlbumImagesQuery($album_id), $page, self::IMAGES_PER_PAGE
        );

        return $this->create($album->getId(), $album->getName(), $result);
    }

    /**
     * Create DetailedAlbum instance
     *
     * @param int $album_id, string $name, SlidingPagination $result
     * @return DetailedAlbum
     */
    public function create($album_id, $name, $result)
    {
        $detailedAlbum = new DetailedAlbum();
        $detailedAlbum->setId($album_id);
        $detailedAlbum->setName($name);
        $detailedAlbum->setResult($result);

        return $detailedAlbum;
    }

}

