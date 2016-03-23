<?php
namespace AppBundle\Entity;

use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;

class DetailedAlbum {

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var SlidingPagination
     */
    private $result;


    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName($name)
    {
        return $this->name;
    }


    /**
     * @param SlidingPagination $result
     */
    public function setResult(SlidingPagination $result) {
        $this->result = $result;
    }

    /**
     * @return SlidingPagination
     */
    public function getResult()
    {
        return $this->result;
    }


}