"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const PropertyMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapboxgl.accessToken || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.186964, 5.603717], // Accra, Ghana
      zoom: 10,
    });

    new mapboxgl.Marker().setLngLat([-0.186964, 5.603717]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    />
  );
};

export default PropertyMap;
