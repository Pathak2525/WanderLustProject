
const Listing = require("../models/listings.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listings/index.ejs", {
        allListings
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash(
            "error",
            "Listing not found!"
        );

        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
        listing
    });
};

module.exports.createListing = async (req, res, next) => {
    try {
        const newListing = new Listing(
            req.body.listing
        );

        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        const savedListing = await newListing.save();

        console.log(savedListing);

        req.flash(
            "success",
            "New Listing Created!"
        );

        res.redirect("/listings");

    } catch (err) {
        next(err);
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash(
            "error",
            "Listing you requested for does not exist!"
        );

        return res.redirect("/listings");
    }

    let originalimageurl = listing.image.url;

    originalimageurl = originalimageurl.replace(
        "/upload",
        "/upload/w_250"
    );

    res.render("listings/edit.ejs", {
        listing,
        originalimageurl
    });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing
        },
        {
            new: true
        }
    );

    if (typeof req.file !== "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };

        await listing.save();
    }

    req.flash(
        "success",
        "Listing updated!"
    );

    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    const deletedListing =
        await Listing.findByIdAndDelete(id);

    console.log(deletedListing);

    req.flash(
        "success",
        "Listing deleted!"
    );

    res.redirect("/listings");
};

