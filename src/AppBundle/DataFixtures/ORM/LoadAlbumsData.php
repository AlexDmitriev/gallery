<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Album;
use AppBundle\Entity\Image;

class LoadAlbumsData implements FixtureInterface
{

    const MAX_ALBUMS = 5;
    const FIRST_ALBUM_IMAGES = 5;
    const OTHER_ALBUMS_MIN_IMAGES = 21;
    const OTHER_ALBUMS_MAX_IMAGES = 49;
    const TOTAL_IMAGES = 50;

    /*
     * Nice names for each album
     */
    private $names = [
        'Visual Optimism',
        'Shadows and Lights',
        'Lower Your Expectations',
        'Black and White',
        'Which Created the Story'
    ];

    public function load(ObjectManager $manager)
    {


        for ($i=0; $i<self::MAX_ALBUMS; $i++)
        {
            $album = new Album();
            $album->setName($this->getName($i));

            foreach ($this->getImages($i) as $filename)
            {
                $image = new Image();
                $image->setFilename($filename.'.jpg');
                $image->setAlbum($album);

                $manager->persist($image);
            }

            $manager->persist($album);
        }

        $manager->flush();
    }


    private function getName($i)
    {
        return $this->names[$i];
    }

    private function getImages($i)
    {
        $images = range(1, self::OTHER_ALBUMS_MAX_IMAGES);
        shuffle($images);

        if ($i == 0) {
            return array_slice($images, 0, self::FIRST_ALBUM_IMAGES);
        }
        else {
            return array_slice($images, 0, rand(self::OTHER_ALBUMS_MIN_IMAGES, self::OTHER_ALBUMS_MAX_IMAGES));
        }
    }
}
